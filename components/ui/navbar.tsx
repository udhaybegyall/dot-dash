import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className='z-50flex fixed left-0 right-0 top-5 z-20 flex items-center justify-around bg-transparent p-4 px-4 py-2'>
            <div className='flex items-center'>
                <Link href='/'>
                    <Image
                        src='/assets/logo.svg'
                        alt='Logo'
                        width={40}
                        height={40}
                    />
                </Link>
            </div>
            <div>
                <Link
                    href='https://github.com/udhaybegyall/dot-dash'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-2 rounded-full border-2 border-border p-1 pl-3 pr-3'
                >
                    <svg
                        className='h-5 w-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path d='M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.21.66-.47v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.14-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.33 1.09 2.9.83.09-.64.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.02A9.67 9.67 0 0112 6.8c.85.004 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.63.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.67-4.57 4.92.36.31.67.93.67 1.88v2.8c0 .26.16.56.67.47C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z' />
                    </svg>
                    <span>GitHub</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
