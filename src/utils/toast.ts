import type { TYPE } from 'vue-toastification';
import { useToast } from 'vue-toastification';

// Create toast
const toast = useToast()

/**
 * Show toast message
 */
function showToast(type: TYPE, message: string) {
  return toast(message, { type });
}

export default showToast;