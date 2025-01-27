import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItems = ({ items, onClose }: { items: any[]; onClose?: () => void }) => {
      const pathname = usePathname();

      console.log(pathname);

      return (
            <>
                  {items.map((item, index) => (
                        <Link
                              key={index}
                              onClick={onClose}
                              className={`text-text-primary  leading-4 ${
                                    pathname === item.path ? ' p-2 text-primary rounded drop-shadow' : 'text-title'
                              }`}
                              href={item.path}
                        >
                              {item.label}
                        </Link>
                  ))}
            </>
      );
};

export default NavItems;
