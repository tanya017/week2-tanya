// import { useEffect, useRef, useState } from "react";

// interface VirtualListOptions {
//     rowHeight: number;
//     visibleRows: number;
//     overscan?: number;
// }

// function useVirtualList<T>(items: T[], options: VirtualListOptions) {
//     const rowHeight = options.rowHeight;
//     const visibleRows = options.visibleRows;
//     const overscan = options.overscan ?? 3;

//     // Piece 2
//     const [scrollTop, setScrollTop] = useState(0);
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(function() {
//         const container = containerRef.current;
//         if(container == null) {return;}

//         function onScroll() {
//             setScrollTop(container?.scrollTop as number); // remember
//         }

//         container.addEventListener('scroll', onScroll);
//         return function() {
//             container.removeEventListener('scroll', onScroll);
//         }
//     }, []);

//     // Piece 4
//     const firstRow = Math.floor(scrollTop / rowHeight);
//     const startIndex = Math.max(0, firstRow-overscan);
//     const endIndex  = Math.min(items.length, firstRow + visibleRows + overscan);

//     const spacerAbove = startIndex + rowHeight;
//     const spacerBelow = (items.length - endIndex)*rowHeight;

//     // Piece 5
//     return{
//         visibleItems: items.slice(startIndex, endIndex),
//         containerRef,
//         spacerAbove,
//         spacerBelow,
//         startIndex
//     }
// }

// export default useVirtualList;

// src/hooks/useVirtualList.ts — complete file
// FILE: src/hooks/useVirtualList.ts
 
import { useState, useEffect, useRef } from 'react';
 
interface VirtualListOptions {
  rowHeight:   number;
  visibleRows: number;
  overscan?:   number;
}
 
function useVirtualList<T>(items: T[], options: VirtualListOptions) {
 
  const rowHeight   = options.rowHeight;
  const visibleRows = options.visibleRows;
  const overscan    = options.overscan ?? 3;
 
  // --- Piece 2 ---
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
 
  // --- Piece 3 ---
  useEffect(function() {
    const container = containerRef.current;
    if (container === null) { return; }
 
    function onScroll() {
    //   setScrollTop(container?.scrollTop as number);
      setScrollTop(container?.scrollTop ?? 0);
    }
 
    container.addEventListener('scroll', onScroll);
    return function() {
      container.removeEventListener('scroll', onScroll);
    };
  }, []);
 
  // --- Piece 4 ---
  const firstRow   = Math.floor(scrollTop / rowHeight);
  const startIndex = Math.max(0, firstRow - overscan);
  const endIndex   = Math.min(items.length, firstRow + visibleRows + overscan);
  const spacerAbove = startIndex * rowHeight;
  const spacerBelow = (items.length - endIndex) * rowHeight;
 
  // --- Piece 5 ---
  return {
    visibleItems: items.slice(startIndex, endIndex),
    containerRef,
    spacerAbove,
    spacerBelow,
    startIndex,
  };
}
 
export default useVirtualList;
