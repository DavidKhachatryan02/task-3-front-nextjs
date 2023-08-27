"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Navigate = ({ path, replace }) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  }, [path, replace, router]);

  return null;
};

export default Navigate;
