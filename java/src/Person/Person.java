package Person;

public class Person {
    private final String name;
    private Number age;

    public Person(String name, Number age) {
        this.name = name;
        this.age = age;
    }

    String eat() {
        return "i can eat";
    }

    public Number getAge() {
        return age;
    }

    void setAge(Number age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }
}
