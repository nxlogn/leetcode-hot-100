function longestPalindrome(s: string): string {
    if (s.length < 2) return s;
    
    let maxLen = 0

    let start = 0;

    function expand(left: number, right: number):void {
        while (left >= 0 && right <= s.length - 1 && s[left] === s[right]) {
            if (maxLen > right - left + 1) {
                maxLen = right - left + 1;
                start = left;
            }
            left++;
            right--;
        } 
    }

    for (let i = 0; i < s.length - 1; i++) {
        expand(i, i);
        expand(i, i + 1);
    }

    return s.substring(start, start + maxLen);
};