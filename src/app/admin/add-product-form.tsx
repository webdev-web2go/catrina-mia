"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Category } from "@/server/db/schema";
import {
  CldImage,
  CldUploadButton,
  CldUploadWidgetInfo,
} from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { getCategoriesAction } from "./category-actions";
import { createProductAction } from "./product-actions";
import { toast } from "sonner";
import SubmitButton from "@/components/submit-button";

export default function AddProductForm() {
  const [uploadInfo, setUploadInfo] = useState<CldUploadWidgetInfo>();
  const [categories, setCategories] = useState<Category[]>();
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    getCategoriesAction()
      .then((categories) => setCategories(categories))
      .finally(() => setCategoriesLoading(false));
  }, []);

  const createProduct = async (formData: FormData) => {
    const categoryId = parseInt(formData.get("category") as string);
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const cloudinaryImageId = uploadInfo?.public_id as string;

    const result = await createProductAction({
      categoryId,
      price,
      description,
      cloudinaryImageId,
    });

    if (result.error) {
      toast.error(result.error, {
        style: { background: "#fff0f0", color: "red" },
      });
    } else {
      toast.success(result.success, {
        style: { background: "#ecfdf3", color: "green" },
      });
      formRef.current?.reset();
      setUploadInfo(undefined);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_300px] items-center gap-4">
      <form
        action={createProduct}
        ref={formRef}
        className="flex flex-col gap-2 [&>fieldset>input]:text-primary"
      >
        <Button asChild className="w-full" variant="outline">
          <CldUploadButton
            uploadPreset="qxympfdg"
            options={{ folder: "catrina-mia" }}
            onUpload={(result) => {
              setUploadInfo(result.info as CldUploadWidgetInfo);
            }}
          >
            Seleccionar foto
          </CldUploadButton>
        </Button>
        <fieldset>
          <label htmlFor="price">Precio</label>
          <Input defaultValue="" id="price" type="number" name="price" />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Descripción</label>
          <Input
            defaultValue=""
            id="description"
            type="text"
            name="description"
            autoComplete="off"
          />
        </fieldset>
        <fieldset>
          <label>Categoría</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {categoriesLoading &&
              new Array(8)
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    className="h-[24px] w-[85px] animate-pulse rounded-md bg-gray-400"
                  />
                ))}
            {!categoriesLoading &&
              categories?.map((category) => (
                <label key={category.id} className="flex items-center gap-1">
                  <Input
                    defaultValue=""
                    type="radio"
                    name="category"
                    className="h-4 w-4 accent-primary"
                    value={category.id}
                  />
                  {category.name}
                </label>
              ))}
          </div>
        </fieldset>
        <SubmitButton
          loadingText="Creando producto..."
          text="Crear producto"
          variant="secondary"
        />
      </form>
      {uploadInfo ? (
        <figure className="aspect-square">
          <CldImage
            width={1000}
            height={1000}
            crop="thumb"
            gravity="center"
            src={uploadInfo.public_id}
            className="rounded"
            alt="Description of my image"
          />
        </figure>
      ) : (
        <div className="flex aspect-square items-center justify-center rounded border-2 border-primary-foreground">
          Foto
        </div>
      )}
    </div>
  );
}
