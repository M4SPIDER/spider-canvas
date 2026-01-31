import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <-- This line is essential. It loads all the styles.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


const examples = [
    { 
        id: 1, 
        title: "Simple Python Print", 
        code: `\`\`\`python
print("Hello from Python in Spy!")
x = 5
y = 3
print(f"Python calculation: {x} * {y} = {x * y}")
\`\`\``, 
        output: "Hello from Python in Spy!\nPython calculation: 5 * 3 = 15" 
    },
    { 
        id: 2, 
        title: "Basic C++ Output", 
        code: `\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "C++ says hi!" << std::endl;
    std::cout << "This is C++ code running through SpyEngine" << std::endl;
    return 0;
}
\`\`\``, 
        output: "C++ says hi!\nThis is C++ code running through SpyEngine" 
    },
    { 
        id: 3, 
        title: "C ", 
        code: `\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello from C language!\\n");
    int a = 10;
    int b = 20;
    printf("Sum of %d and %d is %d\\n", a, b, a + b);
    return 0;
}
\`\`\``, 
        output: "Hello from C language!\nSum of 10 and 20 is 30" 
    },
    { 
        id: 4, 
        title: "Java Greeting", 
        code: `\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Java is ready!");
        System.out.println("Running Java code in Spy format");
        int number = 42;
        System.out.println("The answer is: " + number);
    }
}
\`\`\``, 
        output: "Java is ready!\nRunning Java code in Spy format\nThe answer is: 42" 
    }
];
