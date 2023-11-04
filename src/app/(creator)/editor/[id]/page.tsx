"use client";
import { Icons } from "@/components/Icons";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Editor, { Monaco, useMonaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme } = useTheme();
  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    monacoRef.current = monaco;
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
    <main className="grid h-screen gap-4 p-4 pt-28 pb-28 lg:grid-cols-2 ">
      <Navbar />
      <section className="grid grid-rows-3 gap-2 text-white ">
        <div className="border rounded overflow-clip">
          <div className="px-5 pb-3 shadow-md">
            <p className="flex items-center py-1 border-b font-cal text-primary gap-x-2">
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
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="border rounded ">
          <div className="px-5 pb-3 shadow-md">
            <p className="flex items-center py-1 border-b font-cal text-primary gap-x-2">
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
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="border rounded ">
          <div className="px-5 pt-2 pb-3">
            <div className="flex items-center justify-between pb-1 border-b shadow-md">
              <p className="flex items-center py-1 font-cal text-primary gap-x-2">
                <Icons.js /> <span className="pt-1"> JS</span>
              </p>
              <Button
                onClick={ExecuteJS}
                variant={"outline"}
                className="w-8 h-8"
                size={"icon"}
              >
                <Icons.play className="w-4 h-4 text-primary" />
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
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
          />
        </div>
      </section>
      <section className="flex flex-col px-5 py-5 pt-2 border rounded">
        <div className="flex items-center py-1 ">
          <p className="border-b font-cal text-primary gap-x-2 ">Preview</p>
          <div className=""></div>
        </div>

        <iframe className="flex-1 rounded " ref={iframeRef} />
      </section>
    </main>
  );
}
