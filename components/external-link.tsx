import { Href, Link } from 'expo-router';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        // Web browser modülü kaldırıldı - normal link davranışı
        // Native'de varsayılan tarayıcıda açılacak
      }}
    />
  );
}
