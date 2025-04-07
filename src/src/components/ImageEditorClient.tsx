"use client";

import { useEffect, useRef } from "react";
import ImageEditor from "tui-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

export default function ImageEditorClient() {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && !editorInstance.current) {
      const instance = new ImageEditor(editorRef.current, {
        includeUI: {
          loadImage: {
            path: "",
            name: "SampleImage",
          },
          theme: {},
          menu: [
            "crop",
            "flip",
            "rotate",
            "draw",
            "shape",
            "icon",
            "text",
            "filter",
          ],
          uiSize: {
            width: "1000px",
            height: "700px",
          },
          menuBarPosition: "bottom",
        },
        cssMaxHeight: 600,
        cssMaxWidth: 1000,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70,
        },
        usageStatistics: false,
      });

      editorInstance.current = instance;
    }
  }, []);

  const handleDownload = () => {
    const editor = editorInstance.current;
    if (editor) {
      const dataURL = editor.toDataURL();
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "edited-image.png";
      link.click();
    }
  };

  const handleDelete = () => {
    const editor = editorInstance.current;
    if (!editor) return;

    try {
      const activeObjectId = editor._graphics?.getActiveObjectIdForRemove?.();
      const activeObject = editor._graphics?.getObject(activeObjectId);

      if (!activeObject || !activeObject.type) {
        alert("No object selected to delete.");
        return;
      }

      editor.removeActiveObject();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete selected object.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Image Editor</h1>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Download Edited Image
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete Selected Object
        </button>
      </div>
      <div ref={editorRef} />
    </div>
  );
}