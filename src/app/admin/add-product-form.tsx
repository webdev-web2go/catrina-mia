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
                .map((el, i) => (
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

// {
//   id: 'uw-file3',
//   batchId: 'uw-batch2',
//   asset_id: 'c3928fdb4667cf35e26349981bb43dbe',
//   public_id: 'catrina-mia/typp9ksckuxcekgxh20a',
//   version: 1707925170,
//   version_id: 'a7fe7a64eaa66c5a5fcc36268d45dd67',
//   signature: '45b58ba82145332d2ed4fb3d7e59a0722a4f23be',
//   width: 3072,
//   height: 3072,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2024-02-14T15:39:30Z',
//   tags: [],
//   bytes: 5023876,
//   type: 'upload',
//   etag: '4f3cf7a9788d9834bdbaf1d22a73f49c',
//   placeholder: false,
//   url:
//     'http://res.cloudinary.com/dq4h8pb8h/image/upload/v1707925170/catrina-mia/typp9ksckuxcekgxh20a.jpg',
//   secure_url:
//     'https://res.cloudinary.com/dq4h8pb8h/image/upload/v1707925170/catrina-mia/typp9ksckuxcekgxh20a.jpg',
//   folder: 'catrina-mia',
//   access_mode: 'public',
//   original_filename: '2023113012485673',
//   path: 'v1707925170/catrina-mia/typp9ksckuxcekgxh20a.jpg',
//   thumbnail_url:
//     'https://res.cloudinary.com/dq4h8pb8h/image/upload/c_limit,h_60,w_90/v1707925170/catrina-mia/typp9ksckuxcekgxh20a.jpg'
// }
