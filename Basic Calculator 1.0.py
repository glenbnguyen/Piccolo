













infinity = True
while infinity == True:
    class Calculator():
        def addition(x, y):
            add = x + y
            return add
            print(add)
        def subtraction(x, y):
            sub = x - y
            return sub
            print(sub)
        def multiplication(x, y):
            multi = x * y
            return multi
            print(multi)
        def division(x, y):
            div = x / y
            return div
            print(div)
        def squaring(x, y):
            square = x ** y
            return square

    print("Select an Operation")
    print("'a' - Addition")
    print("'s' - Subtraction")
    print("'m' - Multiplication")
    print("'d' - Division")
    print("'q' - Squaring")


    choice = str(input("Enter your operation #, a=addition / s=subtraction / m=multiplication / d=division / q=squaring: "))


    num_1= int(input("Enter first number: "))
    num_2 = int(input("Enter second number: "))

    if choice == 'a':
        print(num_1, "+", num_2, "=", Calculator.addition(num_1, num_2))
    elif choice == 's':
        print(num_1, "-", num_2, "=", Calculator.subtraction(num_1, num_2))
    elif choice == 'm':
        print(num_1, "*", num_2, "=", Calculator.multiplication(num_1, num_2))
    elif choice == 'd':
        print(num_1, "/", num_2, "=", Calculator.division(num_1, num_2))
    elif choice == 'q':
        print(num_1, "**", num_2, "=", Calculator.squaring(num_1, num_2))
    else:
            print("That is not a valid choice")
    infinity = int(input("Do you want to restart the calculator? 1 for Yes, 2 for No"))

    if infinity == True:
        print("Restarting... ")
        continue
    elif infinity == False:
        print("Exiting... ")
        break



