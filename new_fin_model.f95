module model_mod
    implicit none
    integer, parameter :: n = 1000, nite = 30000
    real, parameter :: pi = 4.0 * atan(1.0), h = 0.05, k2 = 8.0, eta = 1.0
    real, dimension(n) :: omega, theta, dth, tho, dth_o
    real :: alpha, A, tran, r, r_2, t, r1, shi1, r2, shi2
    integer :: k1_start, k1_end
    integer :: i, it, k_loop
  
    interface
      subroutine derivs(t, theta, dth, k1, k2, omega, r1, shi1, r2, shi2)
        real, intent(in) :: t, k1, k2, r1, shi1, r2, shi2
        real, intent(in), dimension(:) :: omega, theta
        real, intent(out), dimension(:) :: dth
      end subroutine derivs
  
      subroutine rk4(y, dydx, yout, n, x, h, omega, r1, shi1, r2, shi2, k1, k2)
        integer, intent(in) :: n
        real, intent(in) :: y(n), dydx(n), x, h, r1, shi1, r2, shi2, k1, k2
        real, intent(in), dimension(n) :: omega
        real, intent(out) :: yout(n)
      end subroutine rk4
    end interface
  
  contains
  
    subroutine model()
      implicit none
      real :: k1
  
      tran = 20000
      alpha = 1.0
      A = n * eta
      k1_start = 0
      k1_end = 4
  
      ! Assign frequencies
      do i = 1, n
        omega(i) = alpha * tan((i * pi) / real(n) - ((n + 1) * pi) / real(2 * n))
      end do
  
      ! Assign initial values for theta
      do i = 1, n
        theta(i) = -pi + 2 * pi * rand()
      end do
  
      ! Transient loop
      do k1 = k1_start, k1_end, 0.1
        r = 0.0
        r_2 = 0.0
        t = 0.0
  
        do it = 1, nite
          ! Order parameters
          r1 = sum(cos(theta)) / real(n)
          shi1 = atan2(sum(sin(theta)), sum(cos(theta)))
          r2 = sqrt(sum(cos(2 * theta)) ** 2 + sum(sin(2 * theta)) ** 2) / real(n)
          shi2 = atan2(sum(sin(2 * theta)), sum(cos(2 * theta)))
  
          if (it > tran) then
            r = r + r1
            r_2 = r_2 + r2
          end if
  
          call derivs(t, theta, dth, k1, k2, omega, r1, shi1, r2, shi2)
          call rk4(theta, dth, tho, n, t, h, omega, r1, shi1, r2, shi2, k1, k2)
  
          do i = 1, n
            theta(i) = mod(tho(i), 2 * pi)
          end do
  
          dth_o = dth
          t = t + h
        end do
  
        r = r / real(nite - tran)
        r_2 = r_2 / real(nite - tran)
        print *, k1, r, r_2
      end do
    end subroutine model
  
  end module model_mod
  
  subroutine derivs(t, theta, dth, k1, k2, omega, r1, shi1, r2, shi2)
    implicit none
    real, intent(in) :: t, k1, k2, r1, shi1, r2, shi2
    real, intent(in), dimension(:) :: omega, theta
    real, intent(out), dimension(:) :: dth
    real :: dth1(size(theta)), dth2(size(theta))
    integer :: n
  
    n = size(theta)
  
    dth1 = k1 * (r1 ** (0.0 + 1)) * sin(shi1 - theta)
    dth2 = k2 * (r2 * r1 ** (0.0 + 1)) * sin(shi2 - shi1 - theta)
    dth = omega + dth1 + dth2
  end subroutine derivs
  
  subroutine rk4(y, dydx, yout, n, x, h, omega, r1, shi1, r2, shi2, k1, k2)
    
    implicit none
    integer, intent(in) :: n
    real, intent(in) :: y(n), dydx(n), x, h, r1, shi1, r2, shi2, k1, k2
    real, intent(in), dimension(n) :: omega
    real, intent(out) :: yout(n)
    real :: dym(n), dyt(n), yt(n), xh, hh, h6
    interface
      subroutine derivs(t, theta, dth, k1, k2, omega, r1, shi1, r2, shi2)
        real, intent(in) :: t, k1, k2, r1, shi1, r2, shi2
        real, intent(in), dimension(:) :: omega, theta
        real, intent(out), dimension(:) :: dth
      end subroutine derivs
    end interface
    hh = h * 0.5
    h6 = h / 6.0
    xh = x + hh
  
    yt = y + hh * dydx
    call derivs(xh, yt, dyt, k1, k2, omega, r1, shi1, r2, shi2)
  
    yt = y + hh * dyt
    call derivs(xh, yt, dym, k1, k2, omega, r1, shi1, r2, shi2)
  
    yt = y + h * dym
    dym = dym + dyt
  
    call derivs(x + h, yt, dyt, k1, k2, omega, r1, shi1, r2, shi2)
  
    yout = y + h6 * (dydx + dyt + 2.0 * dym)
  end subroutine rk4
  
  program main
    use model_mod
    implicit none
  
    call model()
  
  end program main