def max_crossing_subarray(nums, low, mid, high):
    """
    Find the maximum subarray sum crossing the midpoint.

    Parameters:
        nums: list of integers, input list
        low: int, lower index
        mid: int, middle index
        high: int, upper index

    Returns:
        max_sum: int, maximum subarray sum crossing the midpoint
    """
    left_sum = float('-inf')
    current_sum = 0
    for i in range(mid, low - 1, -1):
        current_sum += nums[i]
        left_sum = max(left_sum, current_sum)

    right_sum = float('-inf')
    current_sum = 0
    for i in range(mid + 1, high + 1):
        current_sum += nums[i]
        right_sum = max(right_sum, current_sum)

    return left_sum + right_sum


def max_subarray_sum(nums, low, high):
    """
    Finds the maximum possible sum of a subarray in the list.

    Parameters:
        nums: list of integers, input list
        low: int, lower index
        high: int, upper index

    Returns:
        max_sum: int, maximum possible sum of a subarray
    """
    if low == high:
        return nums[low]

    mid = (low + high) // 2

    left_sum = max_subarray_sum(nums, low, mid)
    right_sum = max_subarray_sum(nums, mid + 1, high)
    cross_sum = max_crossing_subarray(nums, low, mid, high)

    return max(left_sum, right_sum, cross_sum)


# Example
nums = [10, -20, 3, 4, 5, -1, -1, 12, -3, 1]
n = len(nums)
print(max_subarray_sum(nums, 0, n - 1))  # Output: 22
