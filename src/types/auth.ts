export type VehicleType = 'Hatchback' | 'Sedan' | 'SUV' | 'Ticari';

export type UserProfile = {
  fullName: string;
  phone: string;
  password: string;
  cardLast4: string;
  plate?: string;
  vehicleType?: VehicleType;
  onboardingComplete: boolean;
};

export type RegisterForm = {
  fullName: string;
  phone: string;
  password: string;
  cardNumber: string;
  cvv: string;
};
