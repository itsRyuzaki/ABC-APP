import { createFilterOptions, FilterOptionsState } from "@mui/material";

export const ExtractFormData = <T>(formData: HTMLFormElement):T => {
    return Object.fromEntries(
        new FormData(formData).entries() 
      ) as T;
}


export const getCustomAddOption = <T>() => {
  const filter = createFilterOptions<T>();
  return {
    filterOptions: (options: T[], params: FilterOptionsState<T>) => {
      const filtered = filter(options, params);

      if (params.inputValue !== "") {
        filtered.push({
          id: -1,
          name: `Add "${params.inputValue}"`,
        } as any);
      }

      return filtered;
    },
  };
};