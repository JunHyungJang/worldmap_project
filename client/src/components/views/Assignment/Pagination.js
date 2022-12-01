import React from 'react'
import { Button } from 'antd';

function Pagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);
    // console.log("numpages",numPages);
    
    return (
      <>
        <div>
          {/* <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt;
          </Button> */}
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <Button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </Button>
            ))}
          {/* <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
            &gt;
          </Button> */}
        </div>
      </>
    );
}

export default Pagination