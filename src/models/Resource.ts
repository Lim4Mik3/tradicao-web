export interface ResourceModel {
  id: string;
  title: string;
  category: "SERVICES" | "APPS" | "BRANDS" | "CONVINIENCES" | "CHANGE_OIL";
  image?: string;
}