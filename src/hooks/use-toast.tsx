
// This file is needed as a proper import path for the toast component
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/toast";

export const useToast = useToastOriginal;
export const toast = toastOriginal;
