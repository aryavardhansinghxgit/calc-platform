import NotFound from "../not-found";

export const metadata = {
  title: "404 - Page Not Found | CalcPlatform",
  description: "The requested calculator could not be found.",
};

export default function NotFoundPage() {
  return <NotFound />;
}
