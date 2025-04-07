import { useState } from "react";

export default function useExample() {
  const [value, setValue] = useState(null);
  return { value, setValue };
}
