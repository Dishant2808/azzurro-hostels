// Rewards Program Configuration
// This file contains all configurable settings for the rewards program

export const REWARDS_CONFIG = {
  // Points awarded for different actions
  POINTS_PER_BOOKING: 100,
  
  // Bonus multipliers (future use)
  FIRST_BOOKING_BONUS: 1.5, // 150 points for first booking
  VIP_MEMBER_MULTIPLIER: 2.0, // Double points for VIP members
  
  // Minimum thresholds
  MIN_BOOKING_VALUE_FOR_POINTS: 0, // Minimum booking value to earn points (in AUD)
  
  // Point redemption (future use)
  POINTS_TO_CURRENCY_RATIO: 0.01, // 1 point = $0.01 AUD
  MIN_POINTS_FOR_REDEMPTION: 500, // Minimum points needed to redeem
  
  // Display settings
  POINTS_DISPLAY_NAME: "Azzurro Points",
  POINTS_CURRENCY_SYMBOL: "pts",
  
  // Feature flags
  ENABLE_POINT_EXPIRY: false, // Whether points expire
  POINT_EXPIRY_MONTHS: 12, // Points expire after X months
  
  // Notifications
  NOTIFY_ON_POINT_AWARD: true,
  NOTIFY_ON_MILESTONE: true, // Notify when user reaches certain point milestones
  MILESTONE_THRESHOLDS: [100, 500, 1000, 2500, 5000], // Point milestones for notifications
} as const;

// Helper functions for rewards calculations
export const calculateBookingPoints = (bookingValue: number, isFirstBooking = false, isVipMember = false): number => {
  let basePoints: number = REWARDS_CONFIG.POINTS_PER_BOOKING;
  
  // Apply first booking bonus
  if (isFirstBooking) {
    basePoints = Math.floor(basePoints * REWARDS_CONFIG.FIRST_BOOKING_BONUS);
  }
  
  // Apply VIP multiplier
  if (isVipMember) {
    basePoints = Math.floor(basePoints * REWARDS_CONFIG.VIP_MEMBER_MULTIPLIER);
  }
  
  return basePoints;
};

export const formatPoints = (points: number): string => {
  return `${points} ${REWARDS_CONFIG.POINTS_CURRENCY_SYMBOL}`;
};

export const getPointValue = (points: number): number => {
  return points * REWARDS_CONFIG.POINTS_TO_CURRENCY_RATIO;
};