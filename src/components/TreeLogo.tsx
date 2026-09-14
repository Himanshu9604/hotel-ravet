'use client';
export default function TreeLogo({ size = 20 }: { size?: number }) {
 return (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="tree-logo" aria-hidden>
   {/* single continuous trunk-and-branch line, drawn on mount */}
   <path
    className="tree-logo-line"
    d="M22 38V21M22 21C22 21 22 13.5 15.5 9M22 21C22 21 22 13 28.5 8M22 27C22 27 17 25 13 27.5M22 27C22 27 27 25 31 27.5"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
   />
   {/* leaf nodes at each branch tip, pop in after the line finishes */}
   <circle className="tree-logo-leaf" cx="15.5" cy="9" r="2.6" fill="currentColor" />
   <circle className="tree-logo-leaf tree-logo-leaf-2" cx="28.5" cy="8" r="2.6" fill="currentColor" />
   <circle className="tree-logo-leaf tree-logo-leaf-3" cx="13" cy="27.5" r="2" fill="currentColor" opacity=".85" />
   <circle className="tree-logo-leaf tree-logo-leaf-4" cx="31" cy="27.5" r="2" fill="currentColor" opacity=".85" />
   <circle className="tree-logo-spark" cx="22" cy="21" r="1.6" fill="currentColor" />
  </svg>
 );
}
