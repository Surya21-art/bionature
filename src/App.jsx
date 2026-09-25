import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EnquiryModal } from "@/components/common/EnquiryModal";
import { GlobalSearchDialog } from "@/components/common/GlobalSearchDialog";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { AIAssistantModal } from "@/components/common/AIAssistantModal";
import { PageTransition } from "@/components/common/PageTransition";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// Pages
import { Home } from "@/pages/Home";
import { Products } from "@/pages/Products";
import { ProductDetails } from "@/pages/ProductDetails";
import { Solutions } from "@/pages/Solutions";
import { CropSolutions } from "@/pages/CropSolutions";
import { ProblemSolutions } from "@/pages/ProblemSolutions";
import { CropDiagnosis } from "@/pages/CropDiagnosis";
import { FarmerHelp } from "@/pages/FarmerHelp";
import { Blog } from "@/pages/Blog";
import { BlogDetails } from "@/pages/BlogDetails";
import { About } from "@/pages/About";
import { Infrastructure } from "@/pages/Infrastructure";
import { Certifications } from "@/pages/Certifications";
import { Awards } from "@/pages/Awards";
import { Testimonials } from "@/pages/Testimonials";
import { Gallery } from "@/pages/Gallery";
import { Videos } from "@/pages/Videos";
import { Resources } from "@/pages/Resources";
import { Contact } from "@/pages/Contact";
import { Distributor } from "@/pages/Distributor";
import { Admin } from "@/pages/Admin";
import { SearchPage } from "@/pages/SearchPage";
import { SmartProductFinder } from "@/components/solutions/SmartProductFinder";
import { Legal } from "@/pages/Legal";
import NotFound from "@/pages/not-found";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
function Layout({ children, onOpenSearch, onOpenEnquiry }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
      <Header onOpenSearch={onOpenSearch} onOpenEnquiry={onOpenEnquiry} />
      <PageTransition>
        <main className="flex-1 w-full max-w-full">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  );
}
function Router({ onOpenSearch, onOpenEnquiry, onEnquireProduct }) {
  const [location] = useLocation();
  // Admin page gets no public layout
  const isAdmin = location === "/admin";
  return (
    <RoutedErrorBoundary>
      {isAdmin ? (
        <Switch>
          <Route path="/admin" component={Admin} />
        </Switch>
      ) : (
        <Layout onOpenSearch={onOpenSearch} onOpenEnquiry={onOpenEnquiry}>
          <Switch>
            <Route path="/">
              {() => <Home onEnquire={onEnquireProduct} />}
            </Route>

            {/* Products */}
            <Route path="/products">
              {() => <Products onEnquire={onEnquireProduct} />}
            </Route>
            <Route path="/product/:slug">
              {() => <ProductDetails onEnquire={onEnquireProduct} />}
            </Route>
            <Route path="/products/:slug">
              {() => <ProductDetails onEnquire={onEnquireProduct} />}
            </Route>

            {/* Solutions */}
            <Route path="/solutions" component={Solutions} />
            <Route path="/solutions/crops/:crop">
              {() => <CropSolutions onEnquire={onEnquireProduct} />}
            </Route>
            <Route path="/solutions/problems/:problem">
              {() => <ProblemSolutions onEnquire={onEnquireProduct} />}
            </Route>

            {/* Smart finder (standalone page) */}
            <Route path="/smart-finder">
              {() => (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
                  <SmartProductFinder onEnquire={onEnquireProduct} />
                </div>
              )}
            </Route>

            {/* Farmer Help */}
            <Route path="/farmer-help" component={FarmerHelp} />
            <Route path="/crop-diagnosis" component={CropDiagnosis} />

            {/* Blog */}
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogDetails} />

            {/* About cluster */}
            <Route path="/about" component={About} />
            <Route path="/infrastructure" component={Infrastructure} />
            <Route path="/certifications" component={Certifications} />
            <Route path="/awards" component={Awards} />
            <Route path="/testimonials" component={Testimonials} />

            {/* Resources cluster */}
            <Route path="/gallery" component={Gallery} />
            <Route path="/videos" component={Videos} />
            <Route path="/resources" component={Resources} />

            {/* Contact & Distributor */}
            <Route path="/contact" component={Contact} />
            <Route path="/distributor" component={Distributor} />

            {/* Search */}
            <Route path="/search">
              {() => <SearchPage onEnquire={onEnquireProduct} />}
            </Route>

            {/* Legal */}
            <Route path="/privacy" component={Legal} />
            <Route path="/terms" component={Legal} />
            <Route path="/disclaimer" component={Legal} />

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Layout>
      )}
    </RoutedErrorBoundary>
  );
}
function RoutedErrorBoundary({ children }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
// ─── App root ─────────────────────────────────────────────────────────────────
function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState({});
  const handleOpenEnquiry = (productName) => {
    if (typeof productName === "object" && productName !== null) {
      setEnquiryProduct(productName);
    } else {
      setEnquiryProduct({ name: productName });
    }
    setEnquiryOpen(true);
  };
  const handleEnquireProduct = (product) => {
    setEnquiryProduct(product || {});
    setEnquiryOpen(true);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router
            onOpenSearch={() => setSearchOpen(true)}
            onOpenEnquiry={handleOpenEnquiry}
            onEnquireProduct={handleEnquireProduct}
          />

          {/* Global dialogs — rendered outside layout so they're always accessible */}
          <GlobalSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
          <EnquiryModal
            open={enquiryOpen}
            onOpenChange={setEnquiryOpen}
            product={enquiryProduct}
            defaultProductName={enquiryProduct?.name}
            defaultProductSlug={enquiryProduct?.slug}
          />

          {/* Floating WhatsApp button */}
          <WhatsAppButton />
        </WouterRouter>

        <Toaster />
        <SonnerToaster position="top-right" richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;
