"use client";
import { Icons } from "@/components/Icons";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Editor, { Monaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const editorRef = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { theme } = useTheme();
  console.log(theme);
  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }
  const [html, setHtml] = useState<string>("");
  const [css, setCSS] = useState<string>("");
  const [js, setJS] = useState<string>("");
  useEffect(() => {
    if (iframeRef === null) return;
    const timer = setTimeout(() => {
      const iframe = iframeRef.current;
      const iframeDocument = iframeRef.current?.contentDocument;
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeDocument || iframeDocument === null) return;
      iframeDocument.open();
      iframeDocument.write(
        `<html> <script src="https://cdn.tailwindcss.com"></script><style>${css}</style><body class="bg-background">${html}</body><html/>`
      );
      iframeDocument.close();
    }, 250);
    return () => {
      clearTimeout(timer);
    };
  }, [css, html, js]);

  const ExecuteJS = () => {
    if (iframeRef === null) return;
    if (iframeRef.current === null) return;
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow || iframeWindow === null) return;
    (iframeWindow as any)?.eval(js);
  };
  return (
    <main className="p-4  pt-28 pb-28 grid lg:grid-cols-2 gap-4 h-screen ">
      <Navbar />
      <section className="grid grid-rows-3 gap-2   text-white ">
        <div className="border rounded overflow-clip">
          <div className="px-5 pb-3 shadow-md">
            <p className="font-cal border-b  text-primary flex items-center gap-x-2  py-1">
              <Icons.html /> <span className="pt-1">HTML</span>
            </p>
          </div>
          <Editor
            height={"28vh"}
            onChange={(e) => {
              setHtml(e || "");
            }}
            theme={theme === "dark" ? "vs-dark" : "light"}
            defaultValue={html}
            defaultLanguage="html"
          />
        </div>
        <div className="border rounded ">
          <div className="px-5 pb-3 shadow-md">
            <p className="font-cal border-b  text-primary flex items-center gap-x-2  py-1">
              <Icons.css /> <span className="pt-1"> CSS</span>
            </p>
          </div>
          <Editor
            height={"28vh"}
            onChange={(e) => {
              setCSS(e || "");
            }}
            defaultValue={css}
            defaultLanguage="css"
          />
        </div>
        <div className="border rounded ">
          <div className="px-5 pt-2 pb-3">
            <div className="border-b  pb-1  shadow-md flex justify-between items-center">
              <p className="font-cal   text-primary flex items-center gap-x-2  py-1">
                <Icons.js /> <span className="pt-1"> JS</span>
              </p>
              <Button
                onClick={ExecuteJS}
                variant={"outline"}
                className="w-8 h-8"
                size={"icon"}
              >
                <Icons.play className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Editor
            height={"28vh"}
            onChange={(e) => {
              setJS(e || "");
            }}
            theme="vs-dark"
            defaultValue={js}
            defaultLanguage="javascript"
          />
        </div>
      </section>
      <section className="border px-5 py-5 pt-2 rounded  flex flex-col">
        <p className="font-cal border-b  text-primary flex items-center gap-x-2  py-1">
          Preview
        </p>
        <iframe className=" rounded  flex-1 " ref={iframeRef} />
      </section>
    </main>
  );
}
