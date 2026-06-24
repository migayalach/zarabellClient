"use client";
import { useAppDispatch } from "@/app/store/hooks";
import {
  clearCurrentInputRecordData,
  clearInfoInputRecordError,
  resetAllDataInputRecord,
} from "../store/entriesInventory.slice";

export const useInputRecordActions = () => {
  const dispatch = useAppDispatch();

  return {
    clearError: () => dispatch(clearInfoInputRecordError()),
    clearCurrentData: () => dispatch(clearCurrentInputRecordData()),
    resetAll: () => dispatch(resetAllDataInputRecord()),
  };
};
