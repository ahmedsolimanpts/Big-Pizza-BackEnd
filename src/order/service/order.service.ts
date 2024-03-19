import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { ClientSession, Model } from 'mongoose';
import { Order } from '../Model/order.model';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { OrderStatus } from '../enums/Order-Status.enums';
import { OrderInterface } from '../Interface/Order.interface';
import { ProductService } from 'src/product/product.service';
import { EmployeeService } from 'src/employee/service/employee.service';
import { OffersService } from 'src/offers/offers.service';
import { CouponService } from 'src/coupon/coupon.service';
import { BranchService } from 'src/branch/branch.service';
import { Roles } from 'src/auth/enums/roles.enums';
import { CustomerService } from 'src/customer/service/customer.service';
import { CustomerLocationsService } from 'src/customer/service/customer-locations.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderRepo: Model<Order>,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private offerService: OffersService,
    private coponService: CouponService,
    private branchService: BranchService,
    private customerService: CustomerService,
    private cutomerlocationService: CustomerLocationsService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(data: OrderInterface) {
    const session = await this.connection.startSession();
    try {
      await session.withTransaction(async () => {
        const branch = await this.branchService.findOneBranchByID(data.branch);
        if (!branch) throw new NotFoundException('Branch Not Exist');
        const items = data['items'];

        if (data.customer) {
          const customer = await this.customerService.findOneCustomerById(
            data.customer,
          );
          if (!customer) throw new NotFoundException('Cudstomer Not Exist');
        }

        if (data.end_location) {
          const customerLoction =
            await this.cutomerlocationService.findOneCustomerLocationById(
              data.end_location,
            );
          if (!customerLoction)
            throw new NotFoundException('Location Not Exist');
        }

        // Check Item Availability
        for (const item of items) {
          const isProductAvailable =
            await this.productService.IsProductAvailableInBranchWithQuantity(
              item.product,
              data['branch'],
              item.quantity,
              session,
            );
          if (item.extra) {
            const IsValidExtra = await this.productService.IsExtraProducts(
              item.extra,
            );
            if (!IsValidExtra)
              throw new NotFoundException('Products Not Valid For Extra');
          }
          if (!isProductAvailable) {
            throw new NotFoundException(
              "item Doesn't exist with this quantity",
            );
          }
        }
        //  Check Order Offer Availability
        if (data.offers) {
          for (const offer of data.offers) {
            const Is_ValidOffer =
              await this.offerService.IsValidOfferInBranchByID(
                offer,
                data.branch,
                session,
              );
            if (!Is_ValidOffer)
              throw new NotFoundException('Not Valid Offer in Branch');
          }
        }
        // Check Order Coupon Availability
        if (data.coupon) {
          const Is_ValidCoupon =
            await this.coponService.IsValidCouponInBranchByCouponID(
              data.coupon,
              data.branch,
              session,
            );
          if (!Is_ValidCoupon) throw new NotFoundException('Not Valid Coupon');
        }
        // Subtract from Offer
        if (data.offers) {
          for (const offer of data.offers) {
            await this.offerService.SubtractOneFromOfferQuantity(
              offer,
              session,
            );
          }
        }
        // Subtract from Coupon
        if (data.coupon) {
          await this.coponService.SubtractOneFromCouponQuantity(
            data.coupon,
            session,
          );
        }
        // Subtract from stock quantity
        for (const item of items) {
          await this.productService.SubtractproductQuantity(
            item.product,
            item.quantity,
            session,
          );
        }

        // Check If User Work In Branch and Cashier
        const isInBrnch =
          await this.employeeService.IsUserWorkingInBranchAndHaveRole(
            data['createby'],
            data['branch'],
            Roles.CASHIER,
            session,
          );
        if (!isInBrnch) {
          data['order_status'] = OrderStatus.PENDING;
        } else {
          data['order_status'] = OrderStatus.PREPARING;
        }
        const newOrder = new this.orderRepo(data); // Removed session from here
        await newOrder.save({ session });
      });
    } catch (err) {
      // Error handling logic here, if any specific actions needed
      throw err; // Rethrow the error to be handled elsewhere or logged
    } finally {
      await session.endSession(); // Ensure session is ended properly
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepo.find().populate('items.item').exec();
    } catch (err) {
      throw err;
    }
  }

  async findOneOrderByID(id: string): Promise<Order> {
    try {
      return await this.orderRepo
        .findById(id)
        .populate([
          'offers',
          'coupon',
          'branch',
          'items',
          'items.product',
          'end_location',
          'createby',
          'customer',
        ])
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllPendingOrder(): Promise<Order[]> {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.PENDING })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllPreparingOrder(): Promise<Order[]> {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.PREPARING })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllCompeletedOrder(): Promise<Order[]> {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.COMPELETED })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllCompeletedOrderByBranchId(branch_id: string): Promise<Order[]> {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.COMPELETED, branch: branch_id })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllOrderInBranch(branchid: string): Promise<Order[]> {
    try {
      return await this.orderRepo
        .find({ branch: branchid })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllPendingOrderByBranchID(branchid: string) {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.PENDING, branch: branchid })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllPendingOrderByUserID(userid: string) {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.PENDING, createby: userid })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllPreparingOrderByBranchID(branchid: string) {
    try {
      return await this.orderRepo
        .find({ order_status: OrderStatus.PREPARING, branch: branchid })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllOrdersApprovedByUserID(userid: string) {
    try {
      return await this.orderRepo
        .find({ approvedby: userid })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findAllOrdersApprovedByUserIDInSpecificTime(
    userid: string,
    from: Date,
    to: Date,
  ) {
    try {
      return await this.orderRepo
        .find({
          approvedby: userid,
          createdAt: {
            $gte: from,
            $lte: to,
          },
        })
        .populate('items.item')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async ApproveOrderByOrderID(
    orderid: string,
    newStatus: OrderStatus,
    createby: string,
    session?: ClientSession,
  ) {
    try {
      const order = await this.orderRepo.findById(orderid);
      if (order.order_status == newStatus)
        throw new ConflictException('Order In this Status Already');
      // Check If User Work In Branch and Cashier
      const isInBrnch =
        await this.employeeService.IsUserWorkingInBranchAndHaveRole(
          createby,
          order.branch,
          Roles.CASHIER,
          session,
        );
      if (isInBrnch) {
        order.order_status = newStatus;
      }
      return await order.save();
    } catch (err) {
      throw err;
    }
  }

  async ChangeOrderStatusByOrderID(
    orderid: string,
    newStatus: OrderStatus,
    session?: ClientSession,
  ) {
    try {
      return await this.orderRepo
        .findByIdAndUpdate(
          orderid,
          {
            order_status: newStatus,
          },
          { new: true },
        )
        .session(session)
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async removeOneOrderByID(id: string) {
    try {
      return await this.orderRepo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
