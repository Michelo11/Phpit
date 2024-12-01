import { PaginationMeta } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./Ui/Pagination";

interface PaginationComponentProps {
    className?: string;
    paginationMeta: PaginationMeta;
    onPageChange: (page: number) => void;
}

export default function PaginationComponent({
    className = "",
    paginationMeta,
    onPageChange,
}: PaginationComponentProps) {
    const handlePageChange = (page: number) => {
        if (page < 1 || page > paginationMeta.total) return;
        onPageChange(page);
    };

    const generatePageNumbers = () => {
        const { current_page, total } = paginationMeta;
        const pages: (number | "...")[] = [];

        pages.push(1);

        if (current_page > 3) {
            pages.push("...");
        }

        const start = Math.max(2, current_page - 1);
        const end = Math.min(total - 1, current_page + 1);

        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        if (current_page < total - 2) {
            pages.push("...");
        }

        if (total > 1 && !pages.includes(total)) {
            pages.push(total);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <Pagination className={className}>
            <PaginationContent className="cursor-pointer">
                {paginationMeta.current_page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            size="default"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(
                                    paginationMeta.current_page - 1
                                );
                            }}
                        />
                    </PaginationItem>
                )}

                {pageNumbers.map((page, index) => {
                    if (page === "...") {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                size="default"
                                isActive={page === paginationMeta.current_page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page as number);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {paginationMeta.current_page < paginationMeta.total && (
                    <PaginationItem>
                        <PaginationNext
                            size="default"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(
                                    paginationMeta.current_page + 1
                                );
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
