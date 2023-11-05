"use client";
import { Icons } from "@/components/Icons";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Editor, { Monaco, useMonaco } from "@monaco-editor/react";
import { Clipboard, Download, Upload } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useFormState, useFormStatus } from "react-dom";
import { updateProject } from "@/app/dashboard/action";
import html2canvas from "html2canvas";
export default function Home() {
  const router = useParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { theme } = useTheme();

  const [state, formAction] = useFormState(updateProject, {
    message: null,
  });
  const { pending } = useFormStatus();
  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    monacoRef.current = monaco;
  }
  const [html, setHtml] = useState<string>("");
  const [css, setCSS] = useState<string>("");
  const [js, setJS] = useState<string>("");
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    async function fetchProject() {
      try {
        const resp = await axios.post("/api/isOwner", { id: router.id });
        if (resp.status === 200) {
          setCSS(resp.data.css);
          setJS(resp.data.js);
          setHtml(resp.data.html);
          setIsOwner(resp.data.isOwner);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log("axios error");
          console.log(err.cause);
        }
        console.log(err);
      }
    }
    fetchProject();
  }, [router.id]);
  useEffect(() => {
    if (iframeRef === null) return;
    const timer = setTimeout(() => {
      const iframe = iframeRef.current;
      const iframeDocument = iframeRef.current?.contentDocument;
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeDocument || iframeDocument === null) return;
      iframeDocument.open();
      iframeDocument.write(
        `<html> <script src="https://cdn.tailwindcss.com"></script><style>${css}</style><body class="p-10">${html}</body><html/>`
      );
      iframeDocument.close();
    }, 250);
    const screenShotTimer = setTimeout(() => {
      const iframe = iframeRef.current;
      if (!iframe || iframe === null) return;
      html2canvas(iframe.contentDocument?.body as HTMLElement).then(
        (canvas) => {
          const img = canvas.toDataURL("image/png");
          setImage(img);
        }
      );
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(screenShotTimer);
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
            value={html}
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
            value={css}
            theme={theme === "dark" ? "vs-dark" : "light"}
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
            theme={theme === "dark" ? "vs-dark" : "light"}
            value={js}
            defaultLanguage="javascript"
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
          />
        </div>
      </section>
      <section className="flex flex-col px-5 py-5 pt-2 border rounded">
        <div className="flex items-center justify-between w-full py-1 pb-3">
          <p className=" font-cal text-primary gap-x-2">Preview</p>
          <div className="flex items-center justify-between gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className="w-8 h-8"
              onClick={() => {
                const zip = new JSZip();
                zip.file("index.html", html);
                zip.file("index.css", css);
                zip.file("index.js", js);
                zip.generateAsync({ type: "blob" }).then((content) => {
                  saveAs(content, "project.zip");
                });
              }}
            >
              <span className="sr-only">download</span>
              <Download className="w-4 h-4 text-primary" />
            </Button>
            {isOwner && (
              <form action={formAction}>
                <input type="hidden" name="og" value={image} />
                <input type="hidden" name="html" value={html} />
                <input type="hidden" name="css" value={css} />
                <input type="hidden" name="js" value={js} />
                <input type="hidden" name="id" value={router.id} />
                <Button className="w-8 h-8" variant={"outline"} size={"icon"}>
                  <span className="sr-only">upload</span>
                  {pending ? (
                    <Icons.loader className="w-4 h-4 text-primary animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-primary" />
                  )}
                </Button>
              </form>
            )}

            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `<html> <script src="https://cdn.tailwindcss.com"></script><style>${css}</style><body class="bg-background">${html}
                  <script>${js}</script>
                  </body><html/>`
                );
              }}
              className="w-8 h-8"
              variant={"outline"}
              size={"icon"}
            >
              <span className="sr-only"> Copy To Clipboard</span>
              <Clipboard className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>

        <iframe className="flex-1 rounded " ref={iframeRef} />
      </section>
    </main>
  );
}
