import { useWatch } from "react-hook-form";

export const useQrFormValues = (control: any) => {
  return {
    source: useWatch({ control, name: "source" }) ?? "existing",
    linkId: useWatch({ control, name: "linkId" }) ?? "",
    destinationUrl: useWatch({ control, name: "destinationUrl" }) ?? "",
    preset: useWatch({ control, name: "preset" }) ?? "default",
    dotsType: useWatch({ control, name: "dotsType" }) ?? "square",
    dotsColor: useWatch({ control, name: "dotsColor" }) ?? "#161d1f",
    cornersSquareType:
      useWatch({ control, name: "cornersSquareType" }) ?? "square",
    cornersDotType: useWatch({ control, name: "cornersDotType" }) ?? "square",
    cornersColor: useWatch({ control, name: "cornersColor" }) ?? "#161d1f",
    backgroundColor:
      useWatch({ control, name: "backgroundColor" }) ?? "#ffffff",
    logoUrl: useWatch({ control, name: "logoUrl" }) ?? "",
    format: useWatch({ control, name: "format" }) ?? "png",
  };
};
