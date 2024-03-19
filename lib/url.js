export function isValidURL(url) {
    // Regular expression pattern for matching URLs with "http" or "https"
    var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    
    // Check if the URL matches the pattern
    return urlPattern.test(url);
}