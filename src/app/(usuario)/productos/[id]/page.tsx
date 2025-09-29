"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/store/useAuthStore";
import useGetProductoById from "@/hooks/productos/useGetProductoById";
import { MessageError } from "@/components/generics/MessageError";
import useGetSucursalesPais from "@/hooks/sucursales/useGetSucursalesPais";
import useGetExistenciaProductoBySucursal from "@/hooks/productos/useGetExistenciaProductoBySucursal";
import ProductosRelacionados from "../ui/ProductosRelacionados";
import { useFavoritos } from "@/hooks/favoritos/useFavoritos";
import CardDetailsProducto from "../ui/CardDetailsProducto";
import { CarouselApi } from "@/components/ui/carousel";
import DetailsProducto from "../ui/DetailsProducto";

const ProductDetailsPage = () => {
  const { id: productoId } = useParams();
  const { esFavorito, toggleFavorito } = useFavoritos();
  const router = useRouter();
  const { cliente } = useAuthStore();
  const paisId = cliente?.pais.id || "";

  const {
    data: sucursales,
    isLoading: isLoadingSucursales,
    isError: isErrorSucursales,
  } = useGetSucursalesPais(paisId);

  const [sucursalId, setSucursalId] = useState<string>("");

  const {
    data: existencia,
    isLoading: isLoadingExistencia,
    isError: isErrorExistencia,
    refetch: refetchExistencia,
  } = useGetExistenciaProductoBySucursal(productoId as string, sucursalId);

  const {
    data: producto,
    isError: isErrorProducto,
    isLoading: isLoadingProducto,
    refetch: refetchProducto,
  } = useGetProductoById(productoId as string);

  const isFavorite = producto ? esFavorito(producto.id) : false;

  useEffect(() => {
    if (sucursales && sucursales.length > 0 && !sucursalId) {
      setSucursalId(sucursales[0].id);
    }
  }, [sucursales, sucursalId]);

  const getPrecio = () => {
    if (!producto?.preciosPorPais || producto.preciosPorPais.length === 0) {
      return "0.00";
    }
    return producto.preciosPorPais[0].precio || "0.00";
  };

  const getCantidadDisponible = () => {
    if (!existencia || !sucursalId) return 0;
    return existencia || 0;
  };

  const getNombreSucursalSeleccionada = () => {
    if (!sucursales || !sucursalId) return "";
    const sucursal = sucursales.find((s) => s.id === sucursalId);
    return sucursal?.nombre || "";
  };

  const [quantity, setQuantity] = useState(1);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [notas, setNotas] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const handleToggleFavorite = () => {
    if (producto) {
      toggleFavorito(producto);
    }
  };

  useEffect(() => {
    if (carouselApi && selectedImageIndex !== undefined) {
      carouselApi.scrollTo(selectedImageIndex);
    }
  }, [selectedImageIndex, carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setSelectedImageIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  const handleIncrease = () => {
    const cantidadDisponible = getCantidadDisponible();
    if (producto && quantity < cantidadDisponible) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onRefresh = useCallback(async () => {
    await refetchProducto();
    if (sucursalId) {
      await refetchExistencia();
    }
  }, [refetchProducto, refetchExistencia, sucursalId]);

  const handleSucursalChange = (value: string) => {
    setSucursalId(value);
    setQuantity(1);
  };

  const getImagenes = () => {
    if (producto?.imagenes && producto.imagenes.length > 0) {
      return producto.imagenes;
    }

    return [
      {
        id: "default",
        url: "/images/ProductNF.png",
        key: "default",
        mimeType: "image/jpeg",
      },
    ];
  };

  const imagenes = getImagenes();

  useEffect(() => {
    const precio = getPrecio();
    const total = quantity * Number(precio);
    setTotalPrecio(total);
  }, [quantity, producto]);

  if (isErrorSucursales || isErrorProducto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MessageError
          titulo="Error al cargar la información"
          descripcion="Ocurrió un error al cargar los datos del producto o sucursales"
          onPress={onRefresh}
        />
      </div>
    );
  }

  if (isLoadingProducto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MessageError
          titulo="No se encontró el producto seleccionado"
          descripcion="El producto que buscas no está disponible"
          onPress={onRefresh}
        />
      </div>
    );
  }

  const isAvailable = producto.disponible && getCantidadDisponible() > 0;
  const cantidadDisponible = getCantidadDisponible();
  const precio = getPrecio();
  const nombreSucursal = getNombreSucursalSeleccionada();

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/productos")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Productos
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CardDetailsProducto
          imagenes={imagenes}
          producto={producto}
          setCarouselApi={setCarouselApi}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
        />

        <DetailsProducto
          producto={producto}
          isLoadingSucursales={isLoadingSucursales}
          sucursalId={sucursalId}
          handleSucursalChange={handleSucursalChange}
          sucursales={sucursales}
          isLoadingExistencia={isLoadingExistencia}
          isErrorExistencia={isErrorExistencia}
          nombreSucursal={nombreSucursal}
          isAvailable={isAvailable}
          cantidadDisponible={cantidadDisponible}
          cliente={cliente}
          precio={precio}
          handleDecrease={handleDecrease}
          setQuantity={setQuantity}
          quantity={quantity}
          handleIncrease={handleIncrease}
          notas={notas}
          setNotas={setNotas}
          totalPrecio={totalPrecio}
          isFavorite={isFavorite}
          handleToggleFavorite={handleToggleFavorite}
        />
      </div>

      <ProductosRelacionados
        categoriaId={producto.categoria.id}
        producto={producto.id}
        tipo={producto.categoria.tipo}
      />
    </div>
  );
};

export default ProductDetailsPage;
