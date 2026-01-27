const SectionSelectImage = {
  Smtp: 'smtp',
  GatewayNotifications: 'gateway-notifications',
  RemoteActivation: 'remote-activation',
  ManualSetup: 'manual-setup',
  TokenEmail: 'token-email',
  Customization: 'customization',
  Behavior: 'behavior',
  Integrations: 'integrations',
  IdProviders: 'id-providers',
  CustomSettings: 'custom-settings',
  SelfEnrollment: 'self-enrollment',
  ManualUser: 'manual-user',
  TokenChat: 'token-chat',
  WireguardDevice: 'wireguard-device',
  DeviceClc: 'device-clc',
  Location: 'location',
  ServiceLocation: 'service-location',
  ProxyManagement: 'proxy-management',
  Logstash: 'logstash',
  Vector: 'vector',
} as const;

export type SectionSelectImageValue =
  (typeof SectionSelectImage)[keyof typeof SectionSelectImage];
