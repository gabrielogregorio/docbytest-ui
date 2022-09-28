export const copyToClipboard = async (text: string | number | true | object): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text?.toString());
    return true;
  } catch (error) {
    return false;
  }
};
