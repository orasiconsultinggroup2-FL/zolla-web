export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
