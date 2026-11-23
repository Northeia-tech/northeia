import Image from 'next/image'

export default function Brand({ footer = false, priority = false }: { footer?: boolean; priority?: boolean }) {
  return (
    <Image
      src="/northeia-logo.png"
      alt="Northeia"
      width={1536}
      height={1024}
      sizes={footer ? '280px' : '144px'}
      priority={priority}
      className={footer ? 'brand-image brand-image-footer' : 'brand-image'}
    />
  )
}
