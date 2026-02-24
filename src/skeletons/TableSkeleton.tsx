 interface TableSkeletonProps {
    rows?: number; // How many fake data rows to show. Default: 5
    cols?: number; // How many fake data columns to show. Default: 4
    title?: string; // Optional: grey bar where a section title would be
 }

 // Defined OUTSIDE the component so it's not recreated on every render.
 const shimmerCSS = `
    @keyframes shimmer{
        0% {background-position: -400px 0}
        100%{background-position: 400px 0}
    }
        .sk {
            background: linear-gradient(90deg, #f0f0f0 25%, #0e0e0e 50%, #f0f0f0 75%);
            background-size: 400px 100%;
            animation: shimmer 1.4s ease-in-out infinite;
            border-radius: 4px;
            height: 16px;
        }
 `;

 const TableSkeleton: React.FC<TableSkeletonProps> = ({
    rows = 5, // Show 5 rows if caller doesn't say how many
    cols = 4, // Show 4 columns if caller doesn't say how many
    title // undefined by default (no title bar shown)
 }) => {
    return(
        <div style={{ marginBottom: 24}}>

            {/* Inject the shimmer animation CSS */}
            <style>{shimmerCSS}</style>

            {/* If a title was given, show a grey bar where the heading would be */}
            {title && (
                <div className="sk" style={{ width: 200, height: 24, marginBottom: 12}}/>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse'}}>

                {/* Header Row */}
                <thead>
                    <tr style={{ background: '#1E3A8A'}}>
                        {Array.from({ length: cols}).map(function(_, columnIndex){
                            return (
                                <th key={columnIndex} style={{padding: 10, width: `${100/cols}%`}}>
                                    {/* Slightly lighter bar inside the dark header */}
                                    <div className="sk" style={{width: '70%', background: '#4B6FBF'}}/>
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                {/* Data Rows */}
                <tbody> 
                    {Array.from({ length: rows}).map(function(_, rowIndex) {
                        var isEvenRow = rowIndex % 2 === 0;
                        var rowBackground = isEvenRow ? '#fff' : '#F8FAFC';

                        return(
                            <tr key={rowIndex} style={{background: rowBackground}}>
                                {Array.from({ length: cols}).map(function(_, colIndex) {
                                    // Vary the bar width so they don't all look exactly the same
                                    // Pattern 50%, 60%, 70%,  60%, 50%
                                    var extraWidth = (colIndex * 10) % 40;
                                    var barWidth = 50 + extraWidth;

                                    return(
                                        <td key={colIndex} style={{padding: 10}}>
                                            <div className="sk" style={{width: `${barWidth}`}}></div>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
 }

 export default TableSkeleton;