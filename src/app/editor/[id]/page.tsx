"use client";
import Editor, { Monaco } from "@monaco-editor/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const editorRef = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
        `<html> <script src="https://cdn.tailwindcss.com"></script><style>${css}</style><body>${html}<script >${js}</script></body><html/>`
      );
      iframeDocument.close();
    }, 250);
    return () => {
      clearTimeout(timer);
    };
  }, [css, html, js]);
  useEffect(() => {
    if (iframeRef === null) return;
    const timer = setTimeout(() => {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow || iframeWindow === null) return;
      (iframeWindow as any)?.eval(js);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [js]);
  return (
    <main className="grid grid-cols-2 gap-4 h-screen ">
      <section className="grid grid-rows-3 divide-y divide-red-500 text-white ">
        <div>
          <p>HTML</p>
          <Editor
            height={"32vh"}
            onChange={(e) => {
              setHtml(e || "");
            }}
            theme="vs-dark"
            defaultValue={html}
            defaultLanguage="html"
          />
        </div>
        <div className="">
          <p>CSS</p>
          <Editor
            height={"32vh"}
            onChange={(e) => {
              setCSS(e || "");
            }}
            className="bg-red-500"
            defaultValue={css}
            defaultLanguage="css"
          />
        </div>
        <div className="">
          <p>JS</p>
          <Editor
            height={"32vh"}
            onChange={(e) => {
              setJS(e || "");
            }}
            theme="vs-dark"
            defaultValue={js}
            defaultLanguage="javascript"
          />
        </div>
      </section>
      <iframe className="w-full h-full " ref={iframeRef} />
    </main>
  );
}
