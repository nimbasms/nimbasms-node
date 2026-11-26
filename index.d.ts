export interface ClientOptions {
  SERVICE_ID: string;
  SECRET_TOKEN: string;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Link {
  desc: string;
  href: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH';
}

export interface Account {
  sid: string;
  balance?: number;
  sms_balance?: number;
  whatsapp_balance?: number;
  email_balance?: number;
  webhook_url?: string;
  _links?: Link[];
}

export interface Contact {
  contact_id?: string;
  name?: string | null;
  numero?: string | null;
  email?: string | null;
  created_at?: number;
  groups?: string[];
}

export type CreateContactBody = {
  name?: string | null;
  groups?: string[];
} & (
  | { numero: string; email?: string | null }
  | { email: string; numero?: string | null }
);

export interface Group {
  groupe_id?: string;
  name: string;
  added_at?: string;
  total_contact?: number;
}

export type SenderNameStatus = 'pending' | 'refused' | 'accepted';

export interface SenderName {
  sendername_id?: string;
  name?: string;
  status?: SenderNameStatus;
  added_at: number;
}

export type MessageChannel = 'sms' | 'whatsapp' | 'email';

export interface EmailAttachment {
  filename: string;
  content: string;
  content_type?: string;
}

export interface TemplateVariables {
  body?: Record<string, string>;
  [key: string]: unknown;
}

export interface CreateMessageBody {
  sender_name: string;
  to: string[];
  message?: string;
  channel?: MessageChannel;
  subject?: string;
  html?: string;
  reply_to?: string[];
  attachments?: EmailAttachment[];
  template_name?: string | null;
  template_variables?: TemplateVariables;
}

export interface MessageResponse {
  messageid: string;
  message_cost: number;
  url: string;
}

export type DeliveryStatus =
  | 'tosend'
  | 'sent'
  | 'received'
  | 'read'
  | 'failure'
  | 'not_available';

export interface DeliveryMessage {
  id: string;
  contact?: string;
  email?: string;
  status?: DeliveryStatus;
}

export type MessageStatus = 'pending' | 'sent' | 'failure';

export interface MessageDetails {
  messageid?: string;
  sender_name: string;
  status?: MessageStatus;
  sent_at?: number;
  numbers?: DeliveryMessage[];
}

export interface Message {
  messageid?: string;
  sender_name: string;
  to?: string[];
  message?: string;
  message_cost?: number;
  channel?: MessageChannel;
  url?: string;
  subject?: string;
  html?: string;
  reply_to?: string[];
  attachments?: EmailAttachment[];
  template_name?: string | null;
  template_variables?: TemplateVariables;
}

export interface MessageListParams extends PaginationParams {
  sent_at?: string;
  sent_at__lte?: string;
  sent_at__gte?: string;
}

export type VerificationChannel = 'sms' | 'whatsapp' | 'email';

export type VerificationLanguage = 'fr' | 'en';

export type VerificationStatus =
  | 'pending'
  | 'sent'
  | 'expired'
  | 'failure'
  | 'received'
  | 'too_many_attemps'
  | 'approved'
  | 'read';

export interface CreateVerificationBody {
  to?: string;
  sender_name?: string;
  channels?: VerificationChannel[];
  whatsapp_sender_name?: string | null;
  email?: string | null;
  email_sender_name?: string;
  email_template_name?: string;
  email_subject?: string;
  message?: string | null;
  expiry_time?: number | null;
  attempts?: number | null;
  code_length?: number;
  language?: VerificationLanguage;
}

export interface VerificationResponse {
  verificationid: string;
  code?: string;
  message_cost?: number;
  url?: string;
}

export interface VerifyVerificationParams {
  verificationId: string;
  code: string | number;
}

export interface VerificationResult {
  status: VerificationStatus;
}

export type PaymentType =
  | 'Orange'
  | 'Paypal'
  | 'MasterCard/Visa'
  | 'Cash'
  | 'Cheque'
  | 'Virement'
  | 'PayCard'
  | 'Personnalisé'
  | 'Djomy'
  | 'ChapChap';

export interface Purchase {
  uid?: string;
  amount?: string;
  amount_currency?: string;
  quantity?: number;
  payment_type?: PaymentType;
  reference?: string;
  invoice_pdf?: string;
  purchase_at?: string;
}

export type ExtensionCategory =
  | 'payments'
  | 'communication'
  | 'ecommerce'
  | 'automation'
  | 'social'
  | 'crm'
  | 'calendar'
  | 'files'
  | 'forms'
  | 'email'
  | 'shipping'
  | 'chat'
  | 'analytics'
  | 'marketing'
  | 'other';

export type ExtensionAuthType = 'none' | 'api_key' | 'oauth2';

export interface OAuth2Configuration {
  client_id: string;
  client_secret: string;
  authorization_url: string;
  token_url: string;
  scope_separator?: string;
  redirect_url: string;
  available_scopes?: Record<string, string>;
  required_scopes?: string[];
}

export interface CreateExtensionBody {
  name: string;
  category: ExtensionCategory;
  description: string;
  base_api_url: string;
  auth_type: ExtensionAuthType;
  is_paid: boolean;
  documentation_url?: string | null;
  website_url?: string | null;
  oauth2_config?: OAuth2Configuration;
}

export type UpdateExtensionBody = Partial<
  Omit<CreateExtensionBody, 'oauth2_config'>
> & {
  oauth2_config?: OAuth2Configuration;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface CreateExtensionActionBody {
  name: string;
  method: HttpMethod;
  endpoint: string;
  description: string;
  required_params?: Record<string, unknown>;
  optional_params?: Record<string, unknown>;
  response_format?: Record<string, unknown>;
}

export type UpdateExtensionActionBody = Partial<CreateExtensionActionBody>;

export interface ExtensionAction extends CreateExtensionActionBody {
  actionid?: string;
}

export interface Extension {
  extensionid?: string;
  name?: string;
  logo?: string;
  category?: ExtensionCategory;
  description: string;
  base_api_url: string;
  auth_type: ExtensionAuthType;
  is_paid: boolean;
  is_approved?: boolean;
  is_published?: boolean;
  documentation_url?: string | null;
  website_url?: string | null;
  created_at?: string;
  updated_at?: string;
  url?: string;
  oauth2_config?: OAuth2Configuration;
  actions?: ExtensionAction[];
}

export interface ExtensionPublishResult {
  is_published?: boolean;
  status?: string;
}

export interface ExtensionActionPublishResult {
  is_published: boolean;
  status?: string;
}

export type BillingPeriod = 'monthly' | 'yearly';

export interface CreatePricingPlanBody {
  name: string;
  price: string;
  billing_period: BillingPeriod;
  features: Record<string, unknown>;
}

export type UpdatePricingPlanBody = Partial<CreatePricingPlanBody>;

export interface PricingPlan extends CreatePricingPlanBody {
  pricingplanid?: string;
}

export class MessageManager {
  list(params?: MessageListParams): Promise<Paginated<Message>>;
  create(body: CreateMessageBody): Promise<MessageResponse>;
  get(messageId: string): Promise<MessageDetails>;
  next(): Promise<Paginated<Message> | null>;
  previous(): Promise<Paginated<Message> | null>;
}

export class GroupManager {
  list(params?: PaginationParams): Promise<Paginated<Group>>;
  next(): Promise<Paginated<Group> | null>;
  previous(): Promise<Paginated<Group> | null>;
}

export class SenderNameManager {
  list(params?: PaginationParams): Promise<Paginated<SenderName>>;
  next(): Promise<Paginated<SenderName> | null>;
  previous(): Promise<Paginated<SenderName> | null>;
}

export class ContactManager {
  list(params?: PaginationParams): Promise<Paginated<Contact>>;
  create(body: CreateContactBody): Promise<Contact>;
  next(): Promise<Paginated<Contact> | null>;
  previous(): Promise<Paginated<Contact> | null>;
}

export class AccountManager {
  get(): Promise<Account>;
}

export class VerificationManager {
  create(body: CreateVerificationBody): Promise<VerificationResponse>;
  verify(params: VerifyVerificationParams): Promise<VerificationResult>;
}

export class PurchaseManager {
  list(params?: PaginationParams): Promise<Paginated<Purchase>>;
  next(): Promise<Paginated<Purchase> | null>;
  previous(): Promise<Paginated<Purchase> | null>;
}

export class ExtensionManager {
  list(params?: PaginationParams): Promise<Paginated<Extension>>;
  create(body: CreateExtensionBody): Promise<Extension>;
  get(extensionId: string): Promise<Extension>;
  update(extensionId: string, body: UpdateExtensionBody): Promise<Extension>;
  publish(
    extensionId: string,
    isPublished?: boolean,
  ): Promise<ExtensionPublishResult>;
  listActions(
    extensionId: string,
    params?: PaginationParams,
  ): Promise<Paginated<ExtensionAction>>;
  createAction(
    extensionId: string,
    body: CreateExtensionActionBody,
  ): Promise<ExtensionAction>;
  getAction(extensionId: string, actionId: string): Promise<ExtensionAction>;
  updateAction(
    extensionId: string,
    actionId: string,
    body: UpdateExtensionActionBody,
  ): Promise<ExtensionAction>;
  deleteAction(extensionId: string, actionId: string): Promise<unknown>;
  publishAction(
    extensionId: string,
    actionId: string,
    isPublished?: boolean,
  ): Promise<ExtensionActionPublishResult>;
  createPricingPlan(
    extensionId: string,
    body: CreatePricingPlanBody,
  ): Promise<PricingPlan>;
  updatePricingPlan(
    extensionId: string,
    pricingPlanId: string,
    body: UpdatePricingPlanBody,
  ): Promise<PricingPlan>;
  deletePricingPlan(
    extensionId: string,
    pricingPlanId: string,
  ): Promise<unknown>;
  next(): Promise<Paginated<Extension> | null>;
  previous(): Promise<Paginated<Extension> | null>;
}

export class Client {
  constructor(options: ClientOptions);
  readonly messages: MessageManager;
  readonly groups: GroupManager;
  readonly sendernames: SenderNameManager;
  readonly contacts: ContactManager;
  readonly accounts: AccountManager;
  readonly verifications: VerificationManager;
  readonly purchases: PurchaseManager;
  readonly extensions: ExtensionManager;
}
