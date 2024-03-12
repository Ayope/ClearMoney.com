export default function handleWelcomeBack(queryParams, navigate, setShowWelcomeBack) {
    if (queryParams.get('fromAuth')) {
        setShowWelcomeBack(true);
        queryParams.delete('fromAuth');
        navigate({ search: queryParams.toString(), replace: true });
    }
}
