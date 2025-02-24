export const ExtractFormData = <T>(formData: HTMLFormElement):T => {
    return Object.fromEntries(
        new FormData(formData).entries() 
      ) as T;
}