
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  government_id: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
}

export interface ErrorResponse {
  error: string;
}
