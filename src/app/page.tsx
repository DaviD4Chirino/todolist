"use client";
import dynamic from "next/dynamic";
const Content = dynamic(() => import("./Content"), {
  ssr: false,
});
import React from "react";

export default function Page() {
  return <Content />;
}
