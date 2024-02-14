import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProductForm from "./add-product-form";
import { db } from "@/server/db";
import ProductItem from "./product-item";
import { eq } from "drizzle-orm";
import { products } from "@/server/db/schema";

export default async function AdminPage() {
  const activeProducts = await db.query.products.findMany({
    where: eq(products.active, true),
  });
  const inactiveProducts = await db.query.products.findMany({
    where: eq(products.active, false),
  });
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 text-primary-foreground">
      <Tabs defaultValue="addProduct" className="h-[650px] w-[800px] space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="addProduct" className="w-full">
            Agregar producto
          </TabsTrigger>
          <TabsTrigger value="deactivateProduct" className="w-full">
            Deshabilitar producto
          </TabsTrigger>
          <TabsTrigger value="activateProduct" className="w-full">
            Habilitar producto
          </TabsTrigger>
        </TabsList>
        <TabsContent value="addProduct">
          <AddProductForm />
        </TabsContent>
        <TabsContent value="deactivateProduct">
          <div className=" flex h-[650px] flex-col gap-4 overflow-scroll">
            {activeProducts.length > 0 ? (
              activeProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  active={product.active}
                  cloudinaryImageId={product.cloudinaryImageId}
                  description={product.description}
                  price={product.price}
                />
              ))
            ) : (
              <p className="text-center text-xl">
                No hay ningún producto activo por el momento
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="activateProduct">
          <div className="flex h-[650px] flex-col gap-4 overflow-scroll">
            {inactiveProducts.length > 0 ? (
              inactiveProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  active={product.active}
                  cloudinaryImageId={product.cloudinaryImageId}
                  description={product.description}
                  price={product.price}
                />
              ))
            ) : (
              <p className="text-center text-xl">
                No hay ningún producto inactivo por el momento
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
