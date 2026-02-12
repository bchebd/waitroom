import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorData {
  message?: string;
}

export const getErrorMessage = (error: unknown): { status: string; message: string } => {
  if (!error) return { status: "Unbekannt", message: "Unbekannter Fehler" };

  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error
  ) {
    const e = error as FetchBaseQueryError;

    const status =
      typeof e.status === "number"
        ? e.status.toString()
        : e.status?.toString() || "Fehler";

    let message = "Unbekannter Fehler";

    if (typeof e.data === "string") {
      message = e.data;
    } else if (
      typeof e.data === "object" &&
      e.data !== null &&
      "message" in e.data &&
      typeof (e.data as ErrorData).message === "string"
    ) {
      message = (e.data as ErrorData).message!;
    }

    return { status, message };
  }

  // Prüfen, ob es ein normales Error-Objekt ist
  if (typeof error === "object" && error !== null && "message" in error) {
    const e = error as { message: string };
    return { status: "Fehler", message: e.message };
  }

  return { status: "Fehler", message: "Unbekannter Fehler" };
};