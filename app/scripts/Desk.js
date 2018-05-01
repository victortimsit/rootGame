class Desk
{
    constructor() 
    {
        // Scene
        this.scene = new THREE.Scene()

        this.size = 
        {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.mouse = { x: 0, y: 0 }
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.size.width - 0.5
            this.mouse.y = event.clientY / this.size.height - 0.5   
        })

        // this.cube(scene)
        this.camera()
        this.monitor()
        this.desk()
        this.floor()
        this.light()
        this.setRenderer()
        // this.render()
        // this.renderer.render(this.scene, this.camera)
        this.animate()
    }
    camera() 
    {
        this.camera = new THREE.PerspectiveCamera(70, this.size.width / this.size.height)
        // this.camera.position.z = - 5
        this.scene.add(this.camera)
    }
    cube() 
    {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.8 })
        )
        // this.cube.position.z = -20
        cube.rotation.x = 0.3
        this.scene.add(cube)
    }
    light()
    {
        const ambientLight = new THREE.AmbientLight(0x003366, 1)
        ambientLight.castShadow = true
        this.scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 0.5)
        pointLight.position.y = 1
        pointLight.position.z = - 1
        this.scene.add(pointLight)

        const directionalLight = new THREE.DirectionalLight(0xccccff, 0.7)
        directionalLight.position.x = 1
        directionalLight.position.y = 1
        directionalLight.position.z = 1
        directionalLight.castShadow = true
        directionalLight.shadow.camera.top = 1.20
        directionalLight.shadow.camera.right = 1.20
        directionalLight.shadow.camera.bottom = -1.20
        directionalLight.shadow.camera.left = -1.20

        this.scene.add(directionalLight)
    }
    setRenderer()
    {
        this.renderer = new THREE.WebGLRenderer({ antialias: true})
        this.renderer.setSize(this.size.width, this.size.height)
        this.renderer.shadowMap.enabled = true
        document.body.appendChild(this.renderer.domElement)
    }
    render()
    {
        this.renderer.render(this.scene, this.camera)  
    }
    monitor()
    {
        const color = 0xA7ABAB
        const monitor = new THREE.Object3D()
        // monitor.rotation.x = 0.1
        monitor.position.y = - 0.5
        monitor.castShadow = true
        monitor.receiveShadow = true
        
        this.scene.add(monitor)

        // BASE
        const base = new THREE.Object3D()

        // BOTTOM
        const baseBottom = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.15, 1.2),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        baseBottom.castShadow = true
        base.add(baseBottom)

        // MIDDLE
        // Middle left
        const baseMiddleLeft = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.02, 1.2),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        baseMiddleLeft.position.y = 0.085
        baseMiddleLeft.position.x = - 0.2
        baseMiddleLeft.castShadow = true
        base.add(baseMiddleLeft)

        // Middle Right
        const baseMiddleRight = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.02, 1.2),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        baseMiddleRight.position.y = 0.085
        baseMiddleRight.position.x = 0.55
        baseMiddleRight.castShadow = true
        base.add(baseMiddleRight)

        // Middle back
        const baseMiddleBack = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.02, 0.7),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        baseMiddleBack.position.y = 0.085
        baseMiddleBack.position.x = 0.25
        baseMiddleBack.position.z = - 0.25
        baseMiddleBack.castShadow = true
        base.add(baseMiddleBack)
        

        // TOP
        const top = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.07, 1.2),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        top.position.y = 0.13
        top.castShadow = true
        top.receiveShadow = true

        base.add(top)

        // base.castShadow = true
        // base.receiveShadow = true
        monitor.add(base)

        // BETWEEN
        const between = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.16, 0.85),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        between.position.y = 0.235
        between.castShadow = true
        between.receiveShadow = true

        monitor.add(between)

        // SCREEN
        // BOTTOM
        const screen = new THREE.Object3D()

        const screenBottom = new THREE.Mesh(
            new THREE.BoxGeometry(1.1, 0.16, 1.1),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        screenBottom.position.y = 0.335
        screenBottom.castShadow = true

        screen.add(screenBottom)

        // LEFT
        const screenLeft = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.8, 1.1),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        screenLeft.position.y = 0.705
        screenLeft.position.x = - 0.51
        screenLeft.castShadow = true

        screen.add(screenLeft)

        // RIGHT
        const screenRight = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.8, 1.1),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        screenRight.position.y = 0.705
        screenRight.position.x = 0.51
        screenRight.castShadow = true

        screen.add(screenRight)

        // TOP
        const screenTop = new THREE.Mesh(
            new THREE.BoxGeometry(1.1, 0.08, 1.1),
            new THREE.MeshStandardMaterial({ color: color, metalness: 0, roughness: 0.6 })
        )
        screenTop.position.y = 1.065
        screenTop.castShadow = true
        screen.add(screenTop)

        screen.rotation.x = - 0.03
        screen.castShadow = true

        // LCD
        const lcd = new THREE.Mesh(
            new THREE.PlaneGeometry(0.95, 0.7, 1, 1),
            new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.3, roughness: 0.8, transparent: true, opacity: 0.99 })
        )
        lcd.position.y = 0.715
        lcd.position.z = 0.5
        screen.add(lcd)

        monitor.add(screen)
    }
    desk()
    {
        const desk = new THREE.Mesh(
            new THREE.BoxGeometry(4, 0.05, 2.2),
            new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0 })
        )
        desk.position.y = - 0.6
        desk.position.z = 0.4
        desk.receiveShadow = true
        desk.castShadow = true
        this.scene.add(desk)
    }
    floor()
    {
        const floor = new THREE.Mesh(
            new THREE.BoxGeometry(100, 0.05, 100),
            new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0 })
        )
        floor.position.y = - 0.6
        floor.position.z = 0.4
        floor.receiveShadow = true
        this.scene.add(floor)
    }
    animate() 
    {
        window.requestAnimationFrame(this.animate.bind(this))
        // console.log('a')
        // console.log(this.mouse.x)
        this.camera.position.x = this.mouse.x * 4
        this.camera.position.y = - this.mouse.y * 4
        this.camera.position.z = 8
        this.camera.lookAt(this.scene.position)
        
        this.renderer.render(this.scene, this.camera)  
    }
}
