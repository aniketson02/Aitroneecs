import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-32">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 font-display text-6xl tracking-tight">Lost the signal.</h1>
        <p className="mt-4 text-lg text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <ButtonLink href="/" size="lg" className="mt-8">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}
