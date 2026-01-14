import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// CORS Configuration
// Allow only specific origins
const allowedOrigins = [
  "https://azzurrohostels.vercel.app",
  "http://localhost:4000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, or same-origin requests)
      if (!origin) {
        return callback(null, true);
      }
      
      // Normalize origin (remove trailing slash, convert to lowercase for comparison)
      const normalizedOrigin = origin.replace(/\/$/, "").toLowerCase();
      
      // Find the matching allowed origin (case-insensitive, trailing slash insensitive)
      const matchedOrigin = allowedOrigins.find(allowed => 
        allowed.replace(/\/$/, "").toLowerCase() === normalizedOrigin
      );
      
      if (matchedOrigin) {
        // Return the original origin from the request to set the header correctly
        return callback(null, origin);
      }
      
      // Log for debugging
      log(`CORS blocked origin: ${origin}. Allowed origins: ${allowedOrigins.join(", ")}`);
      
      // Reject the request
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    exposedHeaders: ["Content-Type"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Additional CORS headers as fallback (in case cors middleware doesn't catch it)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Log all API requests with origin for debugging
  if (req.path.startsWith("/api") && origin) {
    log(`API Request: ${req.method} ${req.path} from origin: ${origin}`);
  }
  
  if (origin && allowedOrigins.some(allowed => 
    allowed.replace(/\/$/, "").toLowerCase() === origin.replace(/\/$/, "").toLowerCase()
  )) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      log(`OPTIONS preflight handled for origin: ${origin}`);
      return res.status(204).end();
    }
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  // On Windows, reusePort is not supported and causes ENOTSUP.
  // Use a simple listen call compatible across platforms.
  server.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
