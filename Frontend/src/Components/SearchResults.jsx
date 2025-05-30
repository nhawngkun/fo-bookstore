import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import API_URL from '../config';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                console.log("Đang tìm kiếm:", query);
                const response = await axios.get(`${API_URL}/books/search?query=${encodeURIComponent(query)}`);
                setResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tìm kiếm:", error);
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        } else {
            setResults([]);
            setLoading(false);
        }
    }, [query]);

    if (loading) {
        return (
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-7 py-20">
                <div className="flex justify-center items-center h-60">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-7 py-20">
            <h2 className="text-3xl font-bold mb-8 mt-10">Kết quả tìm kiếm cho: "{query}"</h2>
            
            {results.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-500">Không tìm thấy sách nào phù hợp với từ khóa tìm kiếm.</p>
                    <Link to="/" className="mt-4 inline-block text-pink-500 hover:text-pink-700">
                        Quay lại trang chủ
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map(book => (
                        <Card key={book.id} item={book} />
                    ))}
                </div>
            )}
        </div>
    );
};
//
export default SearchResults;
