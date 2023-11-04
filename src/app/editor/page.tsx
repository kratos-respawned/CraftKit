"use client";
import Editor, { Monaco } from "@monaco-editor/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const editorRef = useRef(null);
  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }
  const [html, setHtml] = useState<string>("");
  const [css, setCSS] = useState<string>("");
  const [js, setJS] = useState<string>("");
  const newLocal = `<html></html>`;
  return (
    <main className="grid grid-cols-2 h-screen ">
      <section className="grid grid-rows-3 divide-y divide-red-500 text-white ">
        <div>
          <p>HTML</p>
          <Editor
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
            onChange={(e) => {
              setCSS(e || "");
            }}
            theme="vs-dark"
            defaultValue={css}
            defaultLanguage="css"
          />
        </div>
        <div className="">
          <p>JS</p>
          <Editor
            onChange={(e) => {
              setJS(e || "");
            }}
            theme="vs-dark"
            defaultValue={js}
            defaultLanguage="javascript"
          />
        </div>
      </section>
      <section
        className="text-white"
        // dangerouslySetInnerHTML={{
        //   __html: `<html><style>${kss}</style><body>${xm}<script>${bawa}</script></body><html/>`,
        // }}
      ></section>
    </main>
  );
}
