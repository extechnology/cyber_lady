import { useMutation } from "@tanstack/react-query";
import type { Contact } from "../types/contact.types";
import { contact } from "../api/contact";

export function useContact() {
  return useMutation({
    mutationFn: (data: Contact) => contact(data),
  });
}
