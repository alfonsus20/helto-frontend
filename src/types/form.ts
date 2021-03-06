export type SelectItem = {
  label: string;
  value: string;
};

export type FormTemplateItem<T> = {
  required?: boolean;
  value: T;
  type?: "date" | "text";
};

export type FormTemplate<T extends Object> = {
  [key in keyof T]: FormTemplateItem<T[key]>;
};
